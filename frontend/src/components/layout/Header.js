import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Tabs, Tab } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import ProfileDropDown from '../dialogs/ProfileDropDown';

/**

@author Leander Peter github.com/leander_peter

**/

class Header extends Component {
	constructor(props) {
    super(props);
  

		//init empty state
		this.state = {
			tabindex: 0
		};
	}
	// handles changes of the state of tabs component
	handleTabChange = (e, newIndex) => {
		this.setState({
			tabindex: newIndex
		})
	};
	// Render component
	render() {
    const { user } = this.props;
		return (
      <Paper variant='outlined' >
        <ProfileDropDown user={user} />
        <Typography variant='h3' component='h1' align='center'>
          HdM Wahlfach App
        </Typography>
        <Typography variant='h5' component='h2' align='center'>
        STUDIEREN. WISSEN. MACHEN.
        </Typography>
        {
          user ?
            <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.handleTabChange}  >
              <Tab label='Projekte' component={RouterLink} to={`/projekte`} />
              <Tab label="Meine Projekte" component={RouterLink} to={'/meineprojekte'}/>
              <Tab label='Settings' component={RouterLink} to={``} />
              <Tab label='About' component={RouterLink} to={`/about`} />
            </Tabs>
            : null
        }
      </Paper>
    )
  }
}

// Prop Type
Header.propTypes = {
	// logged in Firebase user/person
	user: PropTypes.object,
}

export default Header;