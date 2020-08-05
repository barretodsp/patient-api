# Patients API

## Project Setup
This step-by-step shows how you can run this api locally.

Requirements:  | Linux | NodeJs | Docker | 

**Setup & Run API**

Run the following commands into terminal to config the database.


``` 
$ docker pull postgres
$ docker run --name desafio-postgres -e "POSTGRES_PASSWORD=postgres" -p 5432:5432 -v /home/desafio/PostgreSQL:/var/lib/postgresql/data -d postgres
$ docker exec -it desafio-postgres bash
$ psql postgres postgres

``` 
Then copy and past all sql script from **./database/init.sql** into postgres console in order to create databases (development and test) and tables.

Finally, exit from container bash and run **npm install** into api folder in order to install all packages.

**Run api**

Run the following commands into terminal to run api in development env.

``` 
$ ./run-dev.sh
``` 
P.S: make sure script granted (chmod 777 run-dev.sh) 

**Run tests**

Run the following commands into terminal to run tests.

``` 
$ ./run-test.sh
$ ./mocha.sh // in other terminal tab.
``` 
P.S: make sure script granted (chmod 777 run-test.sh | chmod 777 mocha.sh ) 


## Endpoints

| HTTP verbs  | Paths | JSON content | Used for
| ------------- | ------------- | ------------- | ------------- |
| POST  | http://localhost:4000/api/v1/patient/create  | { first_name: string, last_name: string, birth_dt: date, blood_type:string, cpf: string(11), contacts: string[] } | Create a patient |
| GET  | http://localhost:4000/api/v1/patient/getAll  | -- | Get a all patients |
| POST  | http://localhost:4000/api/v1/patient/update  |  { patient_id: uuid, first_name: string, last_name: string, blood_type:string } | Update a patient |
| DELETE  | http://localhost:4000/api/v1/patient/delete  | { patient_id: uuid } | Delete a patient |
| POST  | http://localhost:4000/api/v1/contact/create  | { patient_id: uuid, contact_number: string } | Create a contact |
| DELETE  | http://localhost:4000/api/v1/contact/delete  | { contact_id: uuid } | Delete a contact |

## Examples

**Create a patient**

```
curl -X POST -H 'Content-type: application/json' -d '{"first_name": "Ana", "last_name": "Silva", "birth_dt": "2020-05-30", "blood_type": "AB+", "cpf": "11122233344", "contacts": ["(21)2222-3333", "(21)98888-9999"] }' localhost:4000/api/v1/patient/create
```
**Receive all patients**

```
curl -X GET -H 'Content-type: application/json'  localhost:4000/api/v1/patient/getAll
```


**Use this api with client app (https://github.com/barretodsp/patient-front) ! **
