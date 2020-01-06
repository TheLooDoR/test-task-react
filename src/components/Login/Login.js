import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import {Paper} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

import { loginUser } from "../../actions";

const styles = () => ({
    "@global": {
        body: {
            backgroundColor: "#fff"
        }
    },
    paper: {
        marginTop: 100,
        display: "flex",
        padding: 20,
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#3f51b5"
    },
    form: {
        marginTop: 1
    },
    errorText: {
        color: "#f50057",
        marginBottom: 5,
        textAlign: "center"
    },
    submit: {
        padding: 15
    },
    btn_wrap: {
        display: 'flex',
        flexFlow: 'row wrap'
    },
    btn__item: {
        margin: '10px'
    },
    login_btn: {
        padding: '0 25px'
    },
    '@media (max-width: 410px)' : {
        submit: {
            width: '100%'
        },
        login_btn: {
            padding: '15px 25px'
        },
    }
});

class Login extends Component{
    state = {
        email: '',
        password: ''
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value.toLowerCase()
        })
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit = () => {
        const {dispatch} = this.props
        const {email, password} = this.state

        dispatch(loginUser(email, password))
    }

    handleRegisterButton = () => {
        this.props.history.push('/register')
    }

    render() {
        const {classes, loginError, isAuthenticated, isLoggingIn, error} = this.props;
        if (isAuthenticated) {
            return <Redirect to="/"/>;
        } else {
            return (
                <Container component="main" maxWidth="xs">
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Авторизация
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Эл. адрес"
                            name="email"
                            onChange={this.handleEmailChange}
                        />
                        {loginError && (
                            <Typography component="p" className={classes.errorText}>
                                {error.email}
                            </Typography>
                        )}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"
                            onChange={this.handlePasswordChange}
                        />
                        {loginError && (
                            <Typography component="p" className={classes.errorText}>
                                {error.password}
                            </Typography>
                        )}
                        {loginError && (
                            <Typography component="p" className={classes.errorText}>
                                {error.text}
                            </Typography>
                        )}
                        {isLoggingIn ?
                            <CircularProgress />: (
                                <div className={classes.btn_wrap}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        className={`${classes.submit} ${classes.btn__item} ${classes.login_btn}`}
                                        onClick={this.handleSubmit}
                                    >
                                        Войти
                                    </Button>
                                    <Button
                                        type={'button'}
                                        variant={'outlined'}
                                        color='primary'
                                        className={`${classes.submit} ${classes.btn__item} ${classes.btn_register}`}
                                        onClick={this.handleRegisterButton}
                                    >
                                        Зарегестрироваться
                                    </Button>
                                </div>
                            )}

                    </Paper>
                </Container>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated,
        error: state.auth.error
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Login))