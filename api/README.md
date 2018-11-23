# DASI GraphQL Server

## Installation

### Building and Running Locally
~~~sh
# Clone the repo
git clone https://github.com/prayashm97/CIS_3750_DASI.git
cd api

# Retrieve environment variables
# Paste environment variables onto .env
touch .env

# Run the app
npm start

# Navigate to http://localhost:3001/graphql on your browser
~~~
## Usage 
### CRUD 

#### **C**reate Screens

~~~Javascript
// Using GraphiQL
mutation {
  createScreen(input: {
    name: "--Name of Screen--", 
    slides: [--List of Image URLs--], 
    doneBy:"--User ID--"
    }) 
  {
    _id
    name
    slides
    timing
  }
}
~~~

~~~Javascript
// Using Fetch
const query = JSON.stringify({
  query: `mutation {
      createScreen(input: { 
        name: "${project.name}",
        slides: ${JSON.stringify(project.slides)}, 
        timing: ${project.timing},
        doneBy: "--User ID--"}) {
      _id name doneBy { _id } slides timing
    }
  }
  `
})

fetch(`${API_URL}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: query,
})
.then(res => res.json())
.then(({data})=> {
  console.log(data)
})
~~~

#### **R**ead Screens
##### Read All Screens on Database
~~~Javascript
// Using GraphiQL
query {
  allScreens{
    _id name timing
  }
}
~~~

~~~Javascript
//Using Fetch
const query = JSON.stringify({ query: '{ allScreens { _id name slides } }' })

fetch(`${API_URL}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: query,
})
.then(res => res.json())
.then(({data})=> {
  console.log(data)
})
]
~~~
##### Read a Screen
~~~Javascript
// Using GraphiQL
query {
  getScreen(_id: "--Screen ID--") {
    _id name slides timing
  }
}
~~~

~~~Javascript
//Using Fetch
const query = JSON.stringify({ query: '{ getScreen(_id: "${project._id}" { _id name slides } }' })

fetch(`${API_URL}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: query,
})
.then(res => res.json())
.then(({data})=> {
  console.log(data)
})
]
~~~
#### **U**pdate Screens
~~~Javascript
// Using GraphiQL
mutation {
  updateScreen(	_id: "--Screen ID--", input: {
    name: "-----", 
    slides: [-----]
  }) 
  {
    _id
    name
    slides
    timing
  }
}
~~~

~~~Javascript
// Using Fetch
const query = JSON.stringify({
  query: `mutation {
      updateScreen( _id: "${project._id}", input: { 
        name: "${project.name}",
        slides: ${JSON.stringify(project.slides)}, 
        timing: ${project.timing},
       }) {
      _id name doneBy { _id } slides timing
    }
  }
  `
})

fetch(`${API_URL}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: query,
})
.then(res => res.json())
.then(({data})=> {
  console.log(data)
})
~~~

#### **D**elete Screens
~~~Javascript
// Using GraphiQL
mutation {
  removeScreen(_id: "--Screen ID--") {
    _id name
  }
}
~~~

~~~Javascript
// Using Fetch
const query = JSON.stringify({
  query: `mutation {
      removeScreen( _id: "${project._id}") {
      _id name
    }
  }
  `
})

fetch(`${API_URL}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: query,
})
.then(res => res.json())
.then(({data})=> {
  console.log(data)
})
~~~
