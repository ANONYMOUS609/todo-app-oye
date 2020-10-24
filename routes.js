const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todo',
  password: 'password', //(put according to ur db)
  port: 5432,
})


// CREATE todos
const createTodo = (req, res) => {
    const {title, description} = req.body
    var priority_no;
    pool.query(`SELECT COUNT(*) FROM tododb`)
        .then(result => {
          priority_no = parseInt(result)
        })
        .catch(err => console.error('Error executing query', err.stack))
    pool.query('INSERT INTO tododb (title, description, priority) VALUES ($1, $2, $3)', [title, description, priority_no + 1], (error, results) => {
        if(error) {
            throw error
        }
        res.status(201).send(`todo added with ID: ${results.id}`)
    })
}


// UPDATE todos
const updateTodo = (req, res) => {
    const id = parseInt(req.params.id)
    const {title, description} = req.body
  
    pool.query(
      'UPDATE tododb SET title = $1, description = $2 WHERE id = $3',
      [title, description, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`User modified with ID: ${id}`)
      }
    )
}

// DELETE todos
const deleteTodo = (req, res) => {
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM tododb WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`todo deleted with ID: ${id}`)
    })
}

// PRIORATISE todos , {id, pos}
const setPriorityTodo = (req, res) => {
    const id = parseInt(req.params.id)
    const pos = req.body.priority
    const _id; //priority id
    pool.query(`SELECT priority FROM tododb WHERE id = ${id}`)
        .then(result => {
          _id = result.priority
        })
        .catch(err => console.error('Error executing query', err.stack))
    
    if(_id > pos) {
      //+1 (pos, id-1)
      pool.query(
          'UPDATE tododb SET priority = priority + 1 WHERE priority >= $1 AND priority <= $2',
          [pos, _id - 1],
          (error, results) => {
              if(error) {
                  throw error
              }
              res.send(200).send(`priority has been set for list: ${id}`)
          }
      )
      pool.query('UPDATE tododb SET priority = $1 WHERE id = $2', [pos, id], (error, results) => {
          if(error) {
            throw error
          }
          res.status(200).send('operation success')
        }
      )
    } 
    else {
      //-1 (id+1, pos)
      pool.query(
        'UPDATE tododb SET priority = priority - 1 WHERE priority >= $1 AND priority <= $2',
        [_id + 1, pos],
        (error, results) => {
            if(error) {
                throw error
            }
            res.send(200).send(`priority has been set for list: ${id}`)
        }
    )
    pool.query('UPDATE tododb SET priority = $1 WHERE id = $2', [pos, id], (error, results) => {
        if(error) {
          throw error
        }
        res.status(200).send('operation success')
      }
    )
  }
}

// SEARCH todos

//GET todos by search res
const searchTodos = (req, res) => {

    var search_key = req.body.search_key

    pool.query(`SELECT * FROM tododb WHERE title LIKE %${search_key}% OR posting_date LIKE %${search_key}% ORDER BY priority DESC`, (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

module.exports = {
    createTodo,
    deleteTodo,
    updateTodo,
    searchTodos,
    setPriorityTodo
}