import { MDXProvider } from '@mdx-js/react';
import Intro from './slides/intro.mdx';
import Sources from './slides/sources.mdx';
import ManyMasks from './slides/manyMasks.mdx';
import SvgDownFall from './slides/svgDownfall.mdx';
import AnOkQuestion from './slides/anOkQuestion.mdx';
import SvgDownFall2 from './slides/svgDownfall2.mdx';
import SvgDownFall3 from './slides/svgDownfall3.mdx';
import WhyLayerWorks from './slides/whyLayerWorks.mdx';
import ManyMasksDebug from './slides/manyMasksDebug.mdx';
import GoodLayerImplementation from './slides/layerButGood.mdx';
import LayerImplementation from './slides/layerImplementation.mdx';
import LayersImplementation from './slides/layersImplementation.mdx';
import { Deck } from './Deck';
import { mdxComponents } from './MDXComponents';

const App = () => (
  <MDXProvider components={mdxComponents}>
    <Deck
      slides={[
        <Intro key="0" />,
        <LayerImplementation key="1" />,
        <GoodLayerImplementation key="2" />,
        <WhyLayerWorks key="3" />,
        <SvgDownFall key="4" />,
        <SvgDownFall2 key="5" />,
        <SvgDownFall3 key="6" />,
        <LayersImplementation key="7" />,
        <ManyMasks key="8" />,
        <ManyMasksDebug key="9" />,
        <Sources key="10" />,
        <AnOkQuestion key="11" />,
      ]}
    />
  </MDXProvider>
);

export default App;
