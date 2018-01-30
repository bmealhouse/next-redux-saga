async function getInitialProps(WrappedComponent, context) {
  // getInitialProps is called by Next.js at runtime.
  return WrappedComponent.getInitialProps(context)
}

export default getInitialProps
