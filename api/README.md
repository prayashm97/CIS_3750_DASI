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

# Navigate to http://localhost:3001 on your browser
~~~
## Usage 
### CRUD 

#### **C**reate Screens

~~~Javascript
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

#### **R**ead Screens
Read All Screens on Database
~~~Javascript
query {
  allScreens{
    _id name timing
  }
}
~~~
Read a Screen
~~~Javascript
query {
  getScreen(_id: "--Screen ID--") {
    _id name slides timing
  }
}
~~~

#### **U**pdate Screens
~~~Javascript
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

#### **D**elete Screens
~~~Javascript
mutation {
  removeScreen(_id: "--Screen ID--") {
    _id name
  }
}
~~~
