import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
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
      project: null,
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
    this.setState({page: "homepage", project: null})
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
        <React.Fragment>
          <Header page={page} createProject={this.createProject} onPageChangeHome={this.handleQuitProject} onPageChangeAccount={() => this.handlePageChange("myAccount")} onLogout={this.handleLogout}/>
          <div id="spacer" style={{width: "100%",height: "60px"}} />
          <div className={classes.root}>
            {pageContent}
          </div>
        </React.Fragment>
      );
  }
}
export default withStyles(styles)(HomePage);