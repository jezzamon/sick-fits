import App, { Container } from "next/app";
import Page from "../components/Page";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";

interface IAppProps {
  apollo: any;
}
class MyApp extends App<IAppProps> {
  // getInitalProps
  static async getInitalProps({ Component, ctx }) {
    let pageProps = { query: null };
    if (Component.getInitialProps) {
      pageProps = await Component.getInitalProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }
  render = () => {
    // Note Component, is injected into props by Next.js (index.tsx, sell.tsx)
    // Note apollo, is injected into props by withData HOC (index.tsx, sell.tsx)
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
  };
}

export default withData(MyApp);
