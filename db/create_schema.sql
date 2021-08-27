-- DROP SCHEMA IF EXISTS pawscore_dev CASCADE;
-- CREATE SCHEMA IF NOT EXISTS pawscore_dev;
-- SET SCHEMA 'pawscore_dev';
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS applications_status -- PENDING, REJECTED, WITHDREW, SHORTLISTED, SCHEDULED, COMPLETED
(
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status     VARCHAR UNIQUE NOT NULL,
    created_at TIMESTAMP        DEFAULT current_timestamp,
    updated_at TIMESTAMP        DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS adoption_status -- ONGOING, ADOPTED, ARCHIVED
(
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    status     VARCHAR UNIQUE NOT NULL,
    created_at TIMESTAMP        DEFAULT current_timestamp,
    updated_at TIMESTAMP        DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS application_type -- ADOPTION, FOSTER
(
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type       VARCHAR UNIQUE NOT NULL,
    created_at TIMESTAMP        DEFAULT current_timestamp,
    updated_at TIMESTAMP        DEFAULT current_timestamp
);


-- Contains user profile detail. Reference to user_id for external auth
CREATE TABLE IF NOT EXISTS user_profile
(
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     VARCHAR,
    email       VARCHAR NOT NULL UNIQUE,
    phone_no    VARCHAR NOT NULL,
    nric        VARCHAR UNIQUE, -- Putting it as optional first
    first_name  VARCHAR NOT NULL,
    last_name   VARCHAR NOT NULL,
    dob         DATE    NOT NULL,
    gender      CHAR(1) NOT NULL
        CONSTRAINT gender_vals CHECK (gender IN ('F', 'M')),
    occupation  VARCHAR,
    address     VARCHAR NOT NULL,
    postal_code VARCHAR NOT NULL,
    created_at  TIMESTAMP        DEFAULT current_timestamp,
    updated_at  TIMESTAMP        DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS shelter
(
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            VARCHAR NOT NULL,
    address         VARCHAR NOT NULL,
    country         VARCHAR NOT NULL,
    contact         VARCHAR NOT NULL,
    registration_no VARCHAR,
    created_at      TIMESTAMP        DEFAULT current_timestamp,
    updated_at      TIMESTAMP        DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS species -- Cat/Dog
(
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name       VARCHAR UNIQUE NOT NULL,
    created_at TIMESTAMP        DEFAULT current_timestamp,
    updated_at TIMESTAMP        DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS animal
(
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shelter_id      UUID REFERENCES shelter (id),
    adoption_status VARCHAR REFERENCES adoption_status (status),
    species         VARCHAR REFERENCES species (name),
    name            VARCHAR NOT NULL,
    description     VARCHAR NOT NULL DEFAULT '',
    health_issues   VARCHAR NOT NULL DEFAULT '',
    gender          CHAR(1) NOT NULL
        CONSTRAINT gender_vals CHECK (gender IN ('F', 'M')),
    age_months      INTEGER,
    size_cm         INTEGER,
    breed           VARCHAR,
    color           VARCHAR NOT NULL,
    weight_kg       NUMERIC,
    fur_length      VARCHAR,
    vaccinated      BOOLEAN,
    dewormed        BOOLEAN,
    sterilized      BOOLEAN,
    adoption_fee    NUMERIC,
    intake_date     DATE    NOT NULL,

    created_at      TIMESTAMP        DEFAULT current_timestamp,
    updated_at      TIMESTAMP        DEFAULT current_timestamp
);


-- Animals User has adopted
CREATE TABLE IF NOT EXISTS user_animal
(
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_profile_id UUID REFERENCES user_profile (id),
    animal_id       UUID REFERENCES animal (id),
    created_at      TIMESTAMP        DEFAULT current_timestamp,
    updated_at      TIMESTAMP        DEFAULT current_timestamp
);

-- Updates for adopted animal
CREATE TABLE IF NOT EXISTS adopted_animal_update
(
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_animal_id UUID REFERENCES user_animal (id),
    title          VARCHAR NOT NULL,
    due_date       DATE    NOT NULL,
    user_update    VARCHAR,
    published_date DATE,
    created_at     TIMESTAMP        DEFAULT current_timestamp,
    updated_at     TIMESTAMP        DEFAULT current_timestamp
);



CREATE TABLE IF NOT EXISTS questionnaire
(
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    description VARCHAR NOT NULL,
    questions   JSONB   NOT NULL,
    created_at  TIMESTAMP        DEFAULT current_timestamp,
    updated_at  TIMESTAMP        DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS questionnaire_answer
(
    PRIMARY KEY (user_profile_id, questionnaire_id),
    user_profile_id  uuid REFERENCES user_profile (id),
    questionnaire_id uuid REFERENCES questionnaire (id),
    answer           jsonb,
    created_at       TIMESTAMP DEFAULT current_timestamp,
    updated_at       TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS user_animal_application
(
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_profile_id     UUID REFERENCES user_profile (id),
    animal_id           UUID REFERENCES animal (id),
    application_type    VARCHAR REFERENCES application_type (type),      -- adoption or fostering
    application_status  varchar REFERENCES applications_status (status), -- pending, etc
    reason_for_adoption VARCHAR,
    rejection_reason    VARCHAR,
    adoption_fee        NUMERIC NOT NULL,
    created_at          TIMESTAMP        DEFAULT current_timestamp,
    updated_at          TIMESTAMP        DEFAULT current_timestamp
);


CREATE TABLE IF NOT EXISTS animal_image
(
    animal_id     UUID REFERENCES animal (id) ON DELETE CASCADE,
    photo_url     VARCHAR,
    thumbnail_url VARCHAR,
    created_at    TIMESTAMP DEFAULT current_timestamp,
    updated_at    TIMESTAMP DEFAULT current_timestamp
);



CREATE TABLE IF NOT EXISTS user_shelter_bookings
(
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shelter_id      UUID REFERENCES shelter (id),
    user_profile_id UUID REFERENCES user_profile (id),
    start_date      DATE NOT NULL,
    start_time      TIME NOT NULL,
    end_date        DATE NOT NULL,
    end_time        TIME NOT NULL,
    created_at      TIMESTAMP        DEFAULT current_timestamp,
    updated_at      TIMESTAMP        DEFAULT current_timestamp
);
