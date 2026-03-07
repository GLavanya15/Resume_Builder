fetch('http://localhost:3000/api/generate-resume', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        education: [{ degree: 'BSCS' }],
        experience: [],
        projects: [],
        skills: 'TypeScript, React'
    })
}).then(res => res.text()).then(text => console.log('Raw:', text.substring(0, 1000))).catch(err => console.error(err));
