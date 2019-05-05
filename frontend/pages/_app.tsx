import App, { Container } from "next/app";
import Page from "../components/Page";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";

interface IAppProps {
  apollo: any;
}

class MyApp extends App<IAppProps> {
  // getInitalProps - special next.js lifecycle method
  static async getInitialProps({ Component, ctx }) {
    let pageProps = { query: null };
    if (Component.getInitialProps) {
      // if the component we are passing contains props, surface them here
      // so if current component is ShoppingCart, all its props will be available
      //  in pageProps
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query string to the user through props
    pageProps.query = ctx.query;
    return { pageProps };
  }
  render() {
    // Component - is injected into props by Next.js (index.tsx, sell.tsx)
    // apollo - is injected into props by withData HOC (index.tsx, sell.tsx)
    // pageProps - inject props of current component at highest level
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
