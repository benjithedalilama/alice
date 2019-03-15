# alice
A tool used to monitor and control automated systems.

First run `yarn` to install dependencies.

Install nvm, then run `nvm install 10.11`
Having installed node v10.11, run `nvm use 10.11` to use it.

Sensitive environmental variables must be set for the application to work. Let me know directly if you need them.

Run the development stack with `docker-compose up` and tear it down with `docker-compose down`

If you want to peek into the mongo database, visit `localhost:8081` to see an admin interface.
Access the API at `localhost:8080/api/users` and refer to the `swagger.yml` file for rough documentation.
