    const sqlite3 = require('sqlite3').verbose();

    // Connect to SQLite database
    const db = new sqlite3.Database('tasks.db');

    const createTaskTable = () => {
        db.run(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                completed BOOLEAN DEFAULT 0,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
    };

    createTaskTable();

    const Task = {
        create: (task, callback) => {
            db.run('INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)',
                [task.title, task.description, task.completed ? 1 : 0], callback);
        },
        getAll: (callback) => {
            db.all('SELECT * FROM tasks', callback);
        },
        getById: (id, callback) => {
            db.get('SELECT * FROM tasks WHERE id = ?', [id], callback);
        },
        updateById: (id, updates, callback) => {
            const { title, description, completed } = updates;
            db.run('UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
                [title, description, completed ? 1 : 0, id], callback);
        },
        deleteById: (id, callback) => {
            db.run('DELETE FROM tasks WHERE id = ?', [id], callback);
        },
        updateStatusById: (id, completed, callback) => {
            db.run('UPDATE tasks SET completed = ? WHERE id = ?', [completed ? 1 : 0, id], callback);
        },
    };

    module.exports = Task;
