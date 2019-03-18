import React,{Component} from 'react'
import { ThemeProvider } from 'styled-components'
import Helmet from 'react-helmet'
import favicon from '../images/favicon.ico'
import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import config from '../utils/siteConfig'
import Menu from '../components/Menu'
import Footer from '../components/Footer'

import auth from '../utils/auth';


class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  login() {
    auth.login();

    this.setState({
      authenticated: auth.isAuthenticated()
    });
  }

  logout() {
    auth.logout();

    this.setState({
      authenticated: auth.isAuthenticated()
    });
  }

  componentDidMount() {
    this.setState({
      authenticated: auth.isAuthenticated()
    });
  }


  render() {

    const {authenticated} = this.state;
    const {children} = this.props;
    return (
      <div className="siteRoot">
      <Helmet>
        <title>{config.siteTitle}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon} />
      </Helmet>

      <ThemeProvider theme={theme}>
        <>
          <div className="siteContent">
            <Menu auth={!authenticated?{title:'Login',action:this.login}:{title:'Logout',action:this.logout}}/>
            
            { children }
            {/* { (authenticated || this.props.noAuth) && children}
            {(!authenticated && !this.props.noAuth )&& <>
              <br/>
              <h1 style={{margin:'auto',fontSize:40}}>You need to login to see the content</h1></>
            } */}
          </div>
          <Footer />
        </>
      </ThemeProvider>
      <GlobalStyle />
    </div>
    );
  }
}


export default Layout;



