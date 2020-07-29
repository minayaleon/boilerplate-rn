import React, {createRef, useMemo} from 'react';
import {DialogUI, BlockUI} from '@codepso/rn-helper';

const UIContext = React.createContext({});

const UIProvider = props => {
  const {bgColor, txtColor} = props;
  const animation = 'none'; // none, slide
  const message = 'Loading...';

  const blockUI = createRef();
  const dialogUI = createRef();

  const rootUI = useMemo(() => {
    return({
      blockUI,
      dialogUI
    });
  });

  return (
    <UIContext.Provider value={rootUI}>
      {props.children}
      <DialogUI ref={dialogUI} />
      <BlockUI ref={blockUI} bgColor={bgColor} txtColor={txtColor} animation={animation} message={message} />
    </UIContext.Provider>
  );
};

const useGlobalUI = () => {
  return React.useContext(UIContext);
}

export {UIProvider, useGlobalUI};
