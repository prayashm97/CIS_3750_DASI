import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Thumbnail from '../components/Thumbnail';
import Header from '../components/header';
import MyAccount from '../components/myAccount';
import { CreateProject } from '../components/createProject';
import ScreenItem from '../components/ScreenItem';
import Preview from '../components/Preview';

const styles = theme => ({
  root: {
    paddingRight: '15px',
    paddingLeft: '15px',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '80%',
    marginTop: '50px',
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
      page: "homepage",
    }
  }

  componentDidMount() {
    this.getScreens();
  }

  getScreens = () => {
    fetch(process.env.REACT_APP_GRAPHQL_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{ allScreens { _id name slides timing } }' }),
    })
    .then(res => res.json())
    .then(({data})=> {
      console.log(data, this.state.projects);
      this.setState({
        projects: data.allScreens,
        loading: false,
        page: "homepage",
      }, () => {
        console.log(this.state.projects);
      })
    })
  }

  createProject = () => {
    this.setState({page: "project"});
  }

  editProject = (project) => {
    this.setState({page: "edit", project });
  }

  previewProject = (project) => {
    this.setState({page: "preview", project });
  }

  handlePageChange = (page) => {
    this.setState({page: page});
  }

  handleQuitProject = () => {
    this.setState({page: "homepage"})
    this.getScreens();
  }
	
	handleLogout = () => {
		this.props.onLogout();
	}

  render() {
      const { classes } = this.props;
      const { page, project} = this.state;

      let pageContent = null;

      if (page === "project") {
          pageContent = <CreateProject handleQuit={this.handleQuitProject} project={project} />
      } else if (page === "homepage") {
          pageContent = (
            <React.Fragment>
              <div className={classes.buttonDiv}>
                <Button onClick={this.createProject} variant="contained" className={classes.button}>
                  Create New Project
                </Button>
              </div>
              {this.state.projects && this.state.projects.length > 0 ?
                <aside style={{marginTop: '25px'}}>
                  <React.Fragment>
                    {this.state.projects.map((project) => {
                          return (
                            <div key={project._id}>
                                <ScreenItem item={project} refreshPage={() => this.getScreens()} editPage={(item) => this.editProject(item)} previewPage={(item) => this.previewProject(item)} />
                            </div>
                    )})}
                  </React.Fragment>
                </aside>
              : <div></div>}
            </React.Fragment>
          )
      } else if (page === "myAccount") {
          pageContent = <MyAccount onPageChange={this.handleQuitProject}/>
      } else if (page === "edit") {
        pageContent = <CreateProject handleQuit={this.handleQuitProject} project={this.state.project} />
      } else if (page === "preview") {
        pageContent = <Preview exitFullScreen={this.handleQuitProject} project={this.state.project}/>
      }

      return (
        <div>
          <Header onPageChangeHome={this.handleQuitProject} onPageChangeAccount={() => this.handlePageChange("myAccount")} onLogout={this.handleLogout}/>
          
          <div className={classes.root}>
            {pageContent}
          </div>
        </div>
      );
  }
}
export default withStyles(styles)(HomePage);