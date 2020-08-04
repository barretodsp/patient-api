# Patients API

## Project Setup
This step-by-step shows how you can run this api locally.

Requirements:  | Ubuntu | NodeJs | Docker | 

**Setup & Run API**

Run the following commands into terminal to config the database.


``` 
$ docker pull postgres
$ docker run --name desafio-postgres -e "POSTGRES_PASSWORD=postgres" -p 5432:5432 -v /home/desafio/PostgreSQL:/var/lib/postgresql/data -d postgres
$ docker exec -it desafio-postgres bash
$ psql postgres postgres

``` 
Then copy and past all sql script from ./database/init.sql into postgres console in order to create databases (development and test) and tables.


**Run api**

Run the following commands into terminal to run api in development env.

``` 
$ ./run-dev.sh
``` 
P.S: make sure script granted (CHMOD 777 run-dev.sh) 

**Run tests**

Run the following commands into terminal to run tests.

``` 
$ ./run-test.sh
$ ./mocha // in other terminal tab.
``` 
P.S: make sure script granted (CHMOD 777 run-test.sh || CHMOD 777 mocha.sh ) 


## Endpoints

| HTTP verbs  | Paths | JSON content | Used for
| ------------- | ------------- | ------------- | ------------- |
| POST  | /patient/create  | { first_name: string, last_name: string, birth_dt: date, blood_type:string, cpf: string(11), contacts: string[] } | Create a patient |
| GET  | /patient/getAll  | -- | Get a all patients |
| POST  | /patient/update  |  { patient_id: UUID, first_name: string, last_name: string, blood_type:string } | Update a patient |
| DELETE  | /patient/delete  | { patient_id: UUID } | Delete a patient |
| POST  | /contact/create  | { patient_id: UUID, contact_number: string } | Create a contact |
| DELETE  | /contact/delete  | { contact_id: UUID } | Delete a contact |

## Usage Examples


**Use this api with client app (https://github.com/barretodsp/patient-front) ! **
