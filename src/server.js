import http from 'node:http'

const tasks = []

const server = http.createServer((request, response) => {
    const {method, url} = request

    if(method === 'GET' && url === '/tasks'){
        return response.setHeader('Content-type', 'application/json').end(JSON.stringify(tasks))
    }

    if(method === 'POST' && url === '/tasks'){

        tasks.push({
            id: 1,
            title: 'Task one',
            description: 'First task testing',
            completed_at: null,
            created_at: new Date(),
            updated_at: new Date()
        })

        return response.writeHead(201).end()

    }

    return response.writeHead(404).end()
    
})

server.listen(3000)