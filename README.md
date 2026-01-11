# NaaS (No as a Service) 🚫

A simple API that returns creative rejection messages. Because sometimes, you just need to say no—with style.

## Base URL

```
https://naas.nynx.in
```

## Endpoints

### `GET /` or `GET /api/no`

Returns a random rejection message.

**Response:**

```json
{
  "message": "I'm too busy rearranging my sock drawer by color and mood."
}
```

### Golden Rejection (0.1% chance)

If you're statistically special, you might unlock the Golden Rejection:

```json
{
  "message": "NO. (You have unlocked the Golden Rejection. This implies nothing changes, but you are statistically special.)",
  "golden": true,
  "odds": "1/1000"
}
```

## Usage Examples

### cURL

```bash
curl https://naas.nynx.in/api/no
```

### JavaScript

```javascript
fetch('https://naas.nynx.in/api/no')
  .then(res => res.json())
  .then(data => console.log(data.message));
```

### Python

```python
import requests
response = requests.get('https://naas.nynx.in/api/no')
print(response.json()['message'])
```

## Features

- 🎲 **1000+ unique rejection messages**
- 🏆 **0.1% chance for Golden Rejection**
- ⚡ **Fast & serverless** (Vercel Edge)
- 🌐 **CORS enabled** (use from anywhere)
- 🔄 **No caching** (fresh rejection every request)

## License

MIT
