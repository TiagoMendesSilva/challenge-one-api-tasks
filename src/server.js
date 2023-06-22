import http from 'node:http'

const tasks = []

const server = http.createServer( async (request, response) => {
    const {method, url} = request

    const buffers = []

    for await (const chunk of request) {
        buffers.push(chunk)
    }

    try {
        request.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        request.body = null
    }
    

    if(method === 'GET' && url === '/tasks'){
        return response.setHeader('Content-type', 'application/json').end(JSON.stringify(tasks))
    }

    if(method === 'POST' && url === '/tasks'){

        const {title, description} = request.body

        tasks.push({
            id: 1,
            title,
            description,
            completed_at: null,
            created_at: new Date(),
            updated_at: new Date()
        })

        return response.writeHead(201).end()

    }

    return response.writeHead(404).end()
    
})

server.listen(3000)