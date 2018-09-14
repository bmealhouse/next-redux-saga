function getInitialProps(WrappedComponent) {
  // getInitialProps is called by Next.js at runtime.
  return WrappedComponent.getInitialProps({ctx: {}})
}

export default getInitialProps
