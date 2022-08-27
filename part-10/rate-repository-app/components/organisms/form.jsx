const Form = ({ initialValues, onSubmit }) => {
  const onSubmit = async ({ username, password }, { resetForm }) => {
    resetForm({ username: "", password: "" });
  };
  return (
    <ScreenView>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        // validationSchema={validateSchema}
      >
        {({ handleSubmit }) => (
          <View style={styles.container}>
            <FormikTextInput name="username" placeholder="username" />
            <FormikTextInput
              name="password"
              placeholder="password"
              style={{ marginTop: 10 }}
            />
            <Button
              onPress={handleSubmit}
              title="Submit"
              style={{ marginTop: 10 }}
            />
          </View>
        )}
      </Formik>
    </ScreenView>
  );
};

export default Form;
