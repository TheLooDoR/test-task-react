import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions";
import {Container} from "@material-ui/core";
import {Button} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
    wrap: {
        textAlign: 'center',
    },
    user_name: {
        color: 'red',
        fontWeight: 'bold'
    }
})

class Home extends Component {
    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch(logoutUser());
    }

    render() {
        const { classes, isLoggingOut, logoutError, user, error } = this.props;

        return(
            <Container>
                <div className={classes.wrap}>
                    <h2 className="page-title">Главная страница!</h2>
                    <p>Вы авторизовались как <span className={classes.user_name}>{user.email}</span></p>
                    <Button
                        variant={'outlined'}
                        color={'primary'}
                        onClick={this.handleLogout}
                    >
                        Выйти
                    </Button>
                    {isLoggingOut && <p>Logging Out....</p>}
                    {logoutError && <p>{error.text}</p>}
                </div>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError,
        user: state.auth.user,
        error: state.auth.error
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Home))