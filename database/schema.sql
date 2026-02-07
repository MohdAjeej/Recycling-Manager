-- Recycling Production Line Manager Selection System
-- Database Schema

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS rankings;
DROP TABLE IF EXISTS evaluations;
DROP TABLE IF EXISTS candidates;

-- Candidates table
CREATE TABLE candidates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    experience_years INT NOT NULL,
    skills TEXT NOT NULL, -- JSON string or comma-separated
    education VARCHAR(255),
    previous_role VARCHAR(255),
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_experience (experience_years),
    INDEX idx_name (name),
    INDEX idx_created_at (created_at),
    FULLTEXT INDEX idx_skills_fulltext (skills)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Evaluations table (AI scores)
CREATE TABLE evaluations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    candidate_id INT NOT NULL,
    crisis_management_score DECIMAL(5,2) NOT NULL CHECK (crisis_management_score >= 0 AND crisis_management_score <= 100),
    sustainability_score DECIMAL(5,2) NOT NULL CHECK (sustainability_score >= 0 AND sustainability_score <= 100),
    team_motivation_score DECIMAL(5,2) NOT NULL CHECK (team_motivation_score >= 0 AND team_motivation_score <= 100),
    crisis_management_feedback TEXT,
    sustainability_feedback TEXT,
    team_motivation_feedback TEXT,
    evaluated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
    INDEX idx_candidate (candidate_id),
    INDEX idx_scores (crisis_management_score, sustainability_score, team_motivation_score),
    INDEX idx_evaluated_at (evaluated_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Rankings table (auto-updated based on evaluations)
CREATE TABLE rankings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    candidate_id INT NOT NULL UNIQUE,
    total_score DECIMAL(6,2) NOT NULL,
    rank_position INT NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
    INDEX idx_rank (rank_position),
    INDEX idx_score (total_score DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Trigger to auto-update rankings when evaluations are inserted/updated
DELIMITER $$

CREATE TRIGGER update_rankings_after_evaluation_insert
AFTER INSERT ON evaluations
FOR EACH ROW
BEGIN
    DECLARE total DECIMAL(6,2);
    SET total = (NEW.crisis_management_score + NEW.sustainability_score + NEW.team_motivation_score) / 3;
    
    INSERT INTO rankings (candidate_id, total_score, rank_position)
    VALUES (NEW.candidate_id, total, 0)
    ON DUPLICATE KEY UPDATE
        total_score = total,
        last_updated = CURRENT_TIMESTAMP;
    
    -- Recalculate all ranks
    SET @rank = 0;
    UPDATE rankings
    SET rank_position = (@rank := @rank + 1)
    ORDER BY total_score DESC;
END$$

CREATE TRIGGER update_rankings_after_evaluation_update
AFTER UPDATE ON evaluations
FOR EACH ROW
BEGIN
    DECLARE total DECIMAL(6,2);
    SET total = (NEW.crisis_management_score + NEW.sustainability_score + NEW.team_motivation_score) / 3;
    
    UPDATE rankings
    SET total_score = total,
        last_updated = CURRENT_TIMESTAMP
    WHERE candidate_id = NEW.candidate_id;
    
    -- Recalculate all ranks
    SET @rank = 0;
    UPDATE rankings
    SET rank_position = (@rank := @rank + 1)
    ORDER BY total_score DESC;
END$$

DELIMITER ;

-- View for candidate leaderboard
CREATE OR REPLACE VIEW candidate_leaderboard AS
SELECT 
    c.id,
    c.name,
    c.experience_years,
    c.skills,
    r.total_score,
    r.rank_position,
    e.crisis_management_score,
    e.sustainability_score,
    e.team_motivation_score,
    e.evaluated_at
FROM candidates c
INNER JOIN rankings r ON c.id = r.candidate_id
INNER JOIN evaluations e ON c.id = e.candidate_id
ORDER BY r.rank_position ASC;
