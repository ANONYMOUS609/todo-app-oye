# todo-app-oye

# All assumptions made
1. For search part I assumed there will be single field of search
2. For prioritizing I have assumed it would be drag and drop kind of functionality where in backed I'll get id of list and position where that to be prioritize.

#  Approach to the solution
Table will have field(id, title, description, posting_date, priority, state)
1. Approach is like to perform simple CRUD operation on todo list table
2. for creating a new todo we can simply add a new row to the level
3. for every new entry default state is false (incomplete) and priority will be no of rows + 1
4. at anytime priority of lists will be between 1 to no of records or rows.

=> How to perform prioritize functionality

* To prioratize any todo from frontend we get id of that todo and position where to shift that perticular todo
* Algo:
    1. if a todo have to shift upward (more prioratize) change priority for that to do to given pos and increment all todo priority in the range by 1
    eg. we have 5 list having priority 1, 2, 3, 4, 5 and we want to shift todo at 4 to be at 2nd pos
     => change priority of 4->2 and increase priority of 2 and 3 by 1 so it become 3, 4 respectively
    2. similarly for another case if todo have to shift downward approach will be similar just some conditional altration

# DB schema 
    CREATE TABLE tododb (
        id serial PRIMARY KEY,
        title VARCHAR(30),
        posting_date DATE NOT NULL DEFAULT CURRENT_DATE,
        description TEXT,
        priority integer,
        state boolean default false
    );


# Steps to run application 
    => Install postgres database in system and manually create a table with above written code after db creation
    => commands:
        sudo apt install postgresql postgresql-contrib
        sudo -u postgres psql (to access postgress prompt)
    
    => npm install (to install dependencies and related library)
    => node index (entry point of application)
    => test application with by testing APIs using postman or CURL