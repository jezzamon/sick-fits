import App, { Container } from "next/app";
import Page from "../components/Page";
import { ApolloProvider } from "react-apollo"; // exposes apollo client to app
import withData from "../lib/withData";

interface IAppProps {
  apollo: any;
}
class MyApp extends App<IAppProps> {
  // getInitalProps - special next.js lifecycle method
  static async getInitalProps({ Component, ctx }) {
    let pageProps = { query: null };
    if (Component.getInitialProps) {
      // if the component we are passing contains props, surface them here
      // so if current component is ShoppingCart, all its props will be available
      // in pageProps
      pageProps = await Component.getInitalProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps }; // anything returned here will be exposed to this.props (ie. pageProps)
  }
  render = () => {
    const {
      Component, // Component, is injected into props by Next.js (index.tsx, sell.tsx)
      apollo, // apollo, is injected into props by withData HOC (index.tsx, sell.tsx)
      pageProps // access props of current component at highest level
    } = this.props;

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
