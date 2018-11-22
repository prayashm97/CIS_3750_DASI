import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Thumbnail from '../components/Thumbnail';
import { CreateProject } from '../components/createProject';

const styles = theme => ({
  root: {
    paddingRight: '15px',
    paddingLeft: '15px',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '80%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  buttonDiv: {
    display: 'flex',
    justifyContent:'flex-end',
  },
  dropzoneDiv: {
    padding:'15px', display: 'flex', justifyContent: 'center', alignItems: 'center'
  },
});

class HomePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      projects: [],
      mode: "home",
      // authUser: null,
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3001/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ allScreens { _id name slides } }' }),
    })
    .then(res => res.json())
    .then(({data})=> {
      console.log(data, this.state.projects);
      this.setState({
        projects: data.allScreens,
        loading: false,
      }, () => {
        console.log(this.state.projects);
      })
    })
  }

  /*
  Example request for createScreen
  createScreen(input: {
  name: "testScreen", 
  timing: "5"
  slides: ["https://www.telegraph.co.uk/content/dam/Pets/spark/royal-canin/happy-puppy.jpg?imwidth=450", "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn"], 
  doneBy:"5bec460d590441347c352dce"}) {
    _id
    name
    doneBy {_id}
    slides
    timing
  }
  
  */
  createHandle = () => {
    // fetch(`http://localhost:3001/graphql`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ mutation: `{ createScreen(input: {
    //     name: "${name}", 
    //     slides: ${should be array of strings}, 
    //     // put timing here if you want, it defaults to 3 seconds
    //     doneBy:"${leave this as `5bec460d590441347c352dce`}"}) {
    //       _id
    //       name
    //       doneBy {_id}
    //       slides
    //       timing
    //     } }` }),
    // })
    // .then(res => res.json())
    // .then(({data})=> {
    //   console.log(data)
    // })
    this.setState({mode: "create"});
  }

  render() {
    const { classes } = this.props;
    const { mode } = this.state;

    if (mode === "create") {
      return <CreateProject project={undefined} />
    } else if (mode === "home") {
      return (
        <div className={classes.root}>
          <div className={classes.buttonDiv}>
            <Button variant="contained" className={classes.button} onClick={this.createHandle}>Create New Project</Button>
          </div>
  
          {this.state.projects && this.state.projects.length > 0 ?
            <aside>
              <div> 
                {
                  this.state.projects.map((f,i) => {
                    return (
                      <div key={f._id}>
                        <h2>{f.name}</h2>
                        <div className={classes.dropzoneDiv}>
                          {
                              f.slides.map((f, i) => <Thumbnail key={i} src={f} />)
                          }
                        </div>
                      </div>
                      
                    )
                  })
                }
              
              </div>
            </aside>
            : <div></div>
          }
        </div>
      );
    }
  }
}

export default withStyles(styles)(HomePage);
