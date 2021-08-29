SET SCHEMA 'pawscore_dev';

-- PERMISSIONS e.g. admin permissions
INSERT INTO auth_permission(id, name, code_name)
values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'CREATE_USER', 200);
INSERT INTO auth_permission(id, name, code_name)
values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'READ_USER', 200);
INSERT INTO auth_permission(id, name, code_name)
values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3', 'UPDATE_USER', 200);
INSERT INTO auth_permission(id, name, code_name)
values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4', 'DELETE_USER', 200);

-- create group name
INSERT INTO auth_group(id, name)
values ('baaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'admin_user');
INSERT INTO auth_group(id, name)
values ('baaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'normal_user');

-- link list of permissions related to group e.g. CRUD user
INSERT INTO auth_group_permission(auth_group_id, auth_permission_id)
values ('baaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1');
INSERT INTO auth_group_permission(auth_group_id, auth_permission_id)
values ('baaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2');
INSERT INTO auth_group_permission(auth_group_id, auth_permission_id)
values ('baaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3');
INSERT INTO auth_group_permission(auth_group_id, auth_permission_id)
values ('baaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4');

-- Create user
INSERT INTO auth_user(id, username, email, password, is_staff, is_active, is_admin)
values ('faaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'admin@pawscore.com', 'admin@pawscore.com', '12345678', true, true,
        true);

-- Link group permissions to user. e.g. link admin_user group to user
INSERT INTO auth_user_group_permission(auth_user_id, auth_group_id)
values ('faaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'baaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1');

-- Adding basic data type
----------------------------------
-- Application status for pet application
INSERT INTO applications_status (status)
VALUES ('Pending');
INSERT INTO applications_status (status)
VALUES ('Rejected');
INSERT INTO applications_status (status)
VALUES ('Withdrew');
INSERT INTO applications_status (status)
VALUES ('Shortlisted');
INSERT INTO applications_status (status)
VALUES ('Scheduled');
INSERT INTO applications_status (status)
VALUES ('Completed');

-- Add adoption applicaiton
INSERT INTO application_type (type)
VALUES ('Adoption');
INSERT INTO application_type (type)
VALUES ('Foster');


-- Add adoption statuses of pets
INSERT INTO adoption_status (status)
VALUES ('Ongoing');
INSERT INTO adoption_status (status)
VALUES ('Adopted');
INSERT INTO adoption_status (status)
VALUES ('Archived');

-- Species e.g. Cats, Dogs, Horses
INSERT INTO species (name)
VALUES ('Cat');
INSERT INTO species (name)
VALUES ('Dog');
INSERT INTO species (name)
VALUES ('Others');

-- Add adoption application type
INSERT INTO adoption_status (status)
VALUES ('Adoption');
-- INSERT INTO adoption_status (status) VALUES ('Foster');

-- Mock shelter
INSERT INTO shelter (id, name, address, country, contact)
values ('e9c4fb2c-e5bb-4d14-be23-6c264130be88', 'SPCA', '50 Sungei Tengah Rd, Singapore 699012', 'Singapore',
        '6287 5355');
---------------------------------------------

-- Mock animal
INSERT INTO animal (id, shelter_id, adoption_status, adoption_fee, species, name, description, health_issues, gender,
                    age_months, size_cm, breed, color, weight_kg, fur_length, vaccinated, dewormed, sterilized,
                    intake_date)
values ('377fee7f-37cb-4aaf-a805-b41eaa6bf590', 'e9c4fb2c-e5bb-4d14-be23-6c264130be88', 'Ongoing', 50, 'Cat', 'Tom',
        'Tom is a friendly cat with a little fiesty temper', 'A little fat', 'M', 13, 35, 'Local', 'Black',
        2.5, 'long hair', false, false, false, '2021-08-27');
-- cat img
INSERT INTO animal_image (animal_id, photo_url, thumbnail_url)
values ('377fee7f-37cb-4aaf-a805-b41eaa6bf590', 'https://picsum.photos/800', 'https://picsum.photos/200');
INSERT INTO animal_image (animal_id, photo_url, thumbnail_url)
values ('377fee7f-37cb-4aaf-a805-b41eaa6bf590', 'https://picsum.phssssotos/800', 'https://picsum.photos/200');


-- Questionnaire
-- Created this flow using
-- See example on ./questionnaire_example.json
INSERT INTO questionnaire(description, questions)
values ('Adoption Questionaire', '{}');


-- Use cases

-- User creates profile
INSERT INTO auth_user(id, username, email, password, is_staff, is_active, is_admin)
values ('faaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaab', 'tommy@pawscore.com', 'tommy@pawscore.com', '12345667', false, true,
        false);
-- User only have normal group permossiosn
INSERT INTO auth_user_group_permission(auth_user_id, auth_group_id)
values ('faaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaab', 'baaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2');

INSERT INTO user_profile (id, auth_user_id, email, phone_no, nric, first_name, last_name, dob, gender,
                          occupation, address, postal_code)
VALUES ('5df80ec9-afa5-424a-b031-d7e2208ed9d2', 'faaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaab', 'tommy@pawscore.com',
        '+6591234567', '', 'Tommy', 'Tan',
        '1995-01-05', 'M', 'Student',
        '50 Sungei Tengah Rd, Singapore 699012', '699012');

-- User creates adoption to adopt cat
INSERT INTO user_animal_application(user_profile_id, animal_id, application_type, application_status,
                                    reason_for_adoption,
                                    adoption_fee)
values ('5df80ec9-afa5-424a-b031-d7e2208ed9d2', '377fee7f-37cb-4aaf-a805-b41eaa6bf590', 'Adoption', 'Pending',
        'giving the cat a home', 50);

-- Approved creates booking
INSERT INTO user_shelter_bookings (shelter_id, user_profile_id, start_date, start_time, end_date, end_time)
values ('e9c4fb2c-e5bb-4d14-be23-6c264130be88', '5df80ec9-afa5-424a-b031-d7e2208ed9d2', '2021-08-27', '13:00:00',
        '2021-08-27', '14:00:00');

-- Animal belongs to suer
INSERT INTO user_animal(id, user_profile_id, animal_id)
VALUES ('9464cfa3-276c-4448-95fe-8a83d8959d02', '5df80ec9-afa5-424a-b031-d7e2208ed9d2',
        '377fee7f-37cb-4aaf-a805-b41eaa6bf590');

-- User required to fill up these
INSERT INTO adopted_animal_update(user_animal_id, title, due_date)
VALUES ('9464cfa3-276c-4448-95fe-8a83d8959d02', 'Update 1', '2021-02-04');
INSERT INTO adopted_animal_update(user_animal_id, title, due_date)
VALUES ('9464cfa3-276c-4448-95fe-8a83d8959d02', 'Update 1', '2021-03-04');
INSERT INTO adopted_animal_update(user_animal_id, title, due_date)
VALUES ('9464cfa3-276c-4448-95fe-8a83d8959d02', 'Update 1', '2021-04-04');