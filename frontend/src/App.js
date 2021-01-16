import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import firebase from 'firebase/app'; //Firebase module
import 'firebase/auth'; //Firebase module
import Header from './components/layout/Header';
import ProjektListe from './components/ProjektListe';
import ProjektDozentListe from './components/ProjektDozentListe';
// import Electivs from '/components/Electivs';
import About from './components/pages/About';
import Theme from './Theme';
import SignIn from './components/pages/SignIn';
import MeineProjekte from './components/MeineProjekte';
import ProjektBearbeiten from './components/ProjektBearbeiten';
import Notenliste from './components/Notenliste';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import ElectivAPI from './api/ElectivAPI';
import firebaseConfig from './firebaseconfig';
import ProjektverwaltungListe from './components/ProjektverwaltungListe';
import Administration from './components/Administration';
import ModulListe from './components/ModulListe';
import SemesterListe from './components/SemesterListe';
import ProjektartListe from './components/ProjektartListe';
import UserListe from './components/UserListe';


/*
Main page of the electivApp. First firebase to verify users. Then routing to the pages via react-router-dom
*/

class App extends React.Component {
  // initialize firebase
  constructor(props){
    super(props);

    // initialize empty values
    this.state = {
      currentUser: null,
      appError: null,
      authError: null,
      authLoading: false,
      currentStudent: null,
      currentPerson: null
    };
  }
  // creating error boundry. receiving all errors below the component tree

  static getDerivedStateFromError(error) {
    // update state for fallback UI
    return { appError: error };
  }
  
  // handles all user login states with firebase
  handleAuthStateChange = user => {
    if (user) {
      this.setState({
        authLoading: true, 
      });
      // user signed in
      user.getIdToken().then(token => {
        // Token gets storend into cookie
        // Server (backend) can then read out that cookie
        // only token information, safety risk!
        document.cookie = `token=${token};path=/`;
        // set user when token arrives
        this.setState({
          currentUser: user,
          authError: null,
          authLoading: false
        })}).then(() => {
        this.getUserByGoogleID()
      }).catch(e => {
        this.setState({
          authError: e,
          authLoading: false
        });
      });
    } else {
      // user loggend out -> clear id token
      document.cookie = 'token=;path=/';

      // Set the logged out user to null
      this.setState({
        currentUser: null,
        authLoading: false
      });
    }
  }

  // handles the sign in component with firebase.auth()
  handleSignIn = () => {
    this.setState({
      authLoading: true
    });
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  //aktuell eingeloggten Student vom Backend abfragen
  getUserByGoogleID = () => {
    let rolle = this.getCookie("rolle")

    if (rolle === "Student") {
      ElectivAPI.getAPI().getStudentByGoogleID(this.state.currentUser.uid)
        .then(studentBO =>
            this.setState({
                currentStudent: studentBO,
                error: null,
                loadingInProgress: false,
            })
            ).catch(e =>
                this.setState({
                    currentStudent: null,
                    error: e,
                    loadingInProgress: false,
                }));
        this.setState({
            error: null,
            loadingInProgress: true
        });
    }
    else{
      ElectivAPI.getAPI().getPersonByGoogleID(this.state.currentUser.uid)
        .then(personBO =>
            this.setState({
                currentPerson: personBO,
                error: null,
                loadingInProgress: false,
            })
            ).catch(e =>
                this.setState({
                    currentPerson: null,
                    error: e,
                    loadingInProgress: false,
                }));
        this.setState({
            error: null,
            loadingInProgress: true
        });
    }
    setTimeout(()=>{
      console.log(this.state);
    },1000);
    }
    
    //openbook getcookie von Galileo
    getCookie = (name) => {
      var i=0;  //Suchposition im Cookie
      var suche = name + "=";
      while (i<document.cookie.length) {
         if (document.cookie.substring(i, i + suche.length) == suche) {
            var ende = document.cookie.indexOf(";", i + suche.length);
            ende = (ende > -1) ? ende : document.cookie.length;
            var cook = document.cookie.substring(i + suche.length, ende);
            return unescape(cook);
         }
         i++;
      }
      return "";
   }


  // lifecycle method
  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().languageCode = 'en';
    firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
  }

  render() {
    const { currentUser, appError, authError, authLoading, currentStudent, currentPerson } = this.state;

    return (
      <ThemeProvider theme={Theme}>
        {/* Global CSS reset and browser normalization. CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Router basename={process.env.PUBLIC_URL}>
          <Container maxWidth='md'>
            <Header user={currentUser} currentStudent={currentStudent} currentPerson= {currentPerson}/> 
          
            {
              // is the user signed in?
              currentUser ?
                <>
                  <Redirect from='/' to='projekte' />
                  <Route path='/projekte' component ={ProjektListe}>
                    <ProjektListe currentStudent={currentStudent} currentPerson= {currentPerson}/>
                  </Route>
                  <Route path='/about' component={About} />

                  <Route path='/projekteDozent' component={ProjektDozentListe}>
                    <ProjektDozentListe currentStudent={currentStudent} currentPerson= {currentPerson}/>
                  </Route>

                  <Route path='/projektverwaltung' component={ProjektverwaltungListe}>
                    <ProjektverwaltungListe currentStudent={currentStudent} currentPerson= {currentPerson}/>
                  </Route>
                  <Route path='/projektbearbeiten' component={ProjektBearbeiten}>
                    <ProjektBearbeiten currentStudent={currentStudent} currentPerson= {currentPerson}/>
                  </Route>
                  
                  {currentStudent ?
                  <Route path='/meineprojekte' component={MeineProjekte}>
                    <MeineProjekte currentStudent={currentStudent} currentPerson= {currentPerson}/>
                  </Route>
                  
                  :
                  <></>
                  }
                  <Route path='/notenliste' component={Notenliste}>
                    <Notenliste currentStudent={currentStudent} currentPerson= {currentPerson}/>
                  </Route>

                  <Route path='/administration' component={Administration}>
                    <Administration currentPerson= {currentPerson}/>
                  </Route>

                  <Route path='/administration/semester' component={SemesterListe}>
                    <SemesterListe currentPerson= {currentPerson}/>
                  </Route>

                  <Route path='/administration/module' component={ModulListe}>
                    <ModulListe currentPerson= {currentPerson}/>
                  </Route>

                  <Route path='/administration/projektarten' component={ProjektartListe}>
                    <ProjektartListe currentPerson= {currentPerson}/>
                  </Route>

                  <Route path='/administration/user' component={UserListe}>
                    <UserListe currentPerson= {currentPerson}/>
                  </Route>


                </>
                :
                // if not signed in show sign in page
                <>
                  <Redirect to='/index.html' />
                  <SignIn onSignIn={this.handleSignIn} />
                </>
            }
            <LoadingProgress show={authLoading} />
            <ContextErrorMessage error={authError} contextErrorMsg={`Something went wrong during signIn process.`} onReload={this.handleSignIn} />
            <ContextErrorMessage error={appError} contextErrorMsg={`Doh! Something went wrong inside the app. Please reload the page.`} />
          </Container>
        </Router>
      </ThemeProvider>
    );

  }
}

export default App;
