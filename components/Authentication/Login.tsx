const Login = (): JSX.Element => {
  return (
    <form method="POST" action="/api/auth">
      <input type="text" name="username" value="admin" />
      <br />
      <input type="password" name="password" value="admin" />
      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;
