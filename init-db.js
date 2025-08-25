const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho do arquivo do banco de dados
const dbPath = path.join(__dirname, 'tarefas.db');

// Conectar ao banco de dados (cria se não existir)
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados SQLite');
    }
});

// Criar tabela de tarefas
db.run(`
    CREATE TABLE IF NOT EXISTS tarefas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descricao TEXT,
        concluida BOOLEAN DEFAULT FALSE,
        data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
        data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`, (err) => {
    if (err) {
        console.error('Erro ao criar tabela:', err);
    } else {
        console.log('Tabela "tarefas" criada/verificada com sucesso');
        
        // Inserir alguns dados de exemplo
        const insertSample = `
            INSERT OR IGNORE INTO tarefas (titulo, descricao, concluida) 
            VALUES 
            ('Estudar JavaScript', 'Revisar conceitos de async/await', false),
            ('Fazer exercícios', 'Praticar API REST', false),
            ('Configurar ambiente', 'Instalar Node.js e dependências', true)
        `;
        
        db.run(insertSample, (err) => {
            if (err) {
                console.error('Erro ao inserir dados de exemplo:', err);
            } else {
                console.log('Dados de exemplo inseridos com sucesso');
            }
            
            // Fechar conexão
            db.close((err) => {
                if (err) {
                    console.error('Erro ao fechar conexão:', err);
                } else {
                    console.log('Conexão com o banco fechada');
                }
            });
        });
    }
});
