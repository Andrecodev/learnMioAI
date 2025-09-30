// Temporarily disabled for build compatibility - will be enabled after dependencies are installed

export async function GET() {
  return new Response(JSON.stringify({ 
    message: 'User API temporarily disabled - install dependencies first',
    status: 'maintenance'
  }), { 
    status: 503,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function PUT() {
  return new Response(JSON.stringify({ 
    message: 'User API temporarily disabled - install dependencies first',
    status: 'maintenance'
  }), { 
    status: 503,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function DELETE() {
  return new Response(JSON.stringify({ 
    message: 'User API temporarily disabled - install dependencies first',
    status: 'maintenance'
  }), { 
    status: 503,
    headers: { 'Content-Type': 'application/json' }
  });
}