import React, { Component } from "react";
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import {registerUser} from "../../actions";
import { connect } from "react-redux";
import {Redirect} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

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
        padding: 15,
        width: '100%',
        margin: '10px 0px'
    },
});

class Register extends Component {
    state = {
        email: '',
        password: '',
        passwordConfirm: ''
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

    handleConfirmPasswordChange = (e) => {
        this.setState(({
            passwordConfirm: e.target.value
        }))
    }

    handleSubmit = () => {
        const { dispatch } = this.props
        const { email, password, passwordConfirm } = this.state

            dispatch(registerUser(email, password, passwordConfirm))
    }

    handlePasswordConfirmChange = (e) => {
        this.setState({
            passwordConfirm: e.target.value
        })
    }

    handleLoginButton = () => {
        this.props.history.push('/login')
    }

    render() {
       const {classes, isAuthenticated, signUpError, isSigningUp, error} = this.props
        if (isAuthenticated) {
            return <Redirect to="/"/>;
        } else {
            return (
                <Container component="main" maxWidth="xs">
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Регистрация
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
                        {signUpError && (
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
                        {signUpError && (
                            <Typography component="p" className={classes.errorText}>
                                {error.password}
                            </Typography>
                        )}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="passwordConfirm"
                            label="Подтвердить пароль"
                            type="password"
                            id="passwordConfirm"
                            onChange={this.handleConfirmPasswordChange}
                        />
                        {signUpError && (
                            <Typography component="p" className={classes.errorText}>
                                {error.text}
                            </Typography>
                        )}
                        {isSigningUp ?  <CircularProgress />: (
                            <div className={classes.btn_wrap}>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    className={`${classes.submit} ${classes.btn__item} ${classes.login_btn}`}
                                    onClick={this.handleSubmit}
                                >
                                    Зарегестрироваться
                                </Button>
                                <Button
                                    type={'button'}
                                    variant={'outlined'}
                                    color='primary'
                                    className={`${classes.submit} ${classes.btn__item} ${classes.btn_register}`}
                                    onClick={this.handleLoginButton}
                                >
                                    Авторизация
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
        isSigningUp: state.auth.isSigningUp,
        isAuthenticated: state.auth.isAuthenticated,
        signUpError: state.auth.signUpError,
        error: state.auth.error
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Register))