import * as React from 'react';
import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {Input} from 'react-native-elements';
import {Button} from '../../components/Button';
import {AuthContext} from '../../common/AuthProvider';
import Container from './components/Container';
import {Method, httpRequest} from '../../services/serverclient/httpserver';
import {HttpStatusCode} from 'axios';
import {palette} from '../../assets/theme';
const {width, height} = Dimensions.get('screen');

export default function LoginScreen() {
  const navigation = useNavigation();
  const {setAuthTokens} = React.useContext(AuthContext);

  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  function validateEmail(email: string): Boolean {
    var emailValid = false;
    if (email.length == 0) {
      setEmailError('Email is required');
    } else if (email.length < 6) {
      setEmailError('Email should be minimum 6 characters');
    } else if (email.indexOf(' ') >= 0) {
      setEmailError('Email cannot contain spaces');
    } else {
      setEmailError('');
      emailValid = true;
    }
    return emailValid;
  }

  function validatePassword(password: string): Boolean {
    var passwordValid = false;
    if (password.length == 0) {
      setPasswordError('Password is required');
    } else if (password.length < 6) {
      setPasswordError('Password should be minimum 6 characters');
    } else if (password.indexOf(' ') >= 0) {
      setPasswordError('Password cannot contain spaces');
    } else {
      setPasswordError('');
      passwordValid = true;
    }
    return passwordValid;
  }

  return (
    <Container>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async variables => {
          if (
            validateEmail(variables.email) &&
            validatePassword(variables.password)
          ) {
            try {
              const {data, status} = await httpRequest('auth', Method.POST, {
                email: variables.email,
                password: variables.password,
              });
              switch (status) {
                case HttpStatusCode.Ok:
                  console.log('User authenticated');
                  setAuthTokens({
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                  });
                  break;
                case HttpStatusCode.Forbidden:
                  console.warn(
                    'Incorrect username/combination. Please try again.',
                  );
                  break;
                case HttpStatusCode.InternalServerError:
                  console.error('Internal server error occured.');
                  break;
                default:
                  console.error('Unknown status returned.');
                  break;
              }
            } catch (err) {
              console.error('error', err);
            }
          }
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <>
            <Input
              textContentType="emailAddress"
              placeholder="Email Address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {emailError.length > 0 && <Text>{emailError}</Text>}

            <Input
              textContentType="password"
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {passwordError.length > 0 && <Text>{passwordError}</Text>}

            <Button
              title={'Login'}
              onPress={handleSubmit}
              disabled={false}
              containerStyle={styles.actionButton}
            />
          </>
        )}
      </Formik>
    </Container>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    marginVertical: 24,
  },
});
