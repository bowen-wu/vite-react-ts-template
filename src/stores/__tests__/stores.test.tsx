import React, { useContext } from 'react';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Context from '../context';
import initializeStore from '../initializeStore';
import { customRender } from '../../tests/shared/customRenderTest';
import scopedClasses from '../../utils/scopedClasses';
import { TestActionTypeEnum } from '../test.store';

const sc = scopedClasses('test');

interface TestProps {
  newContent?: string;
}

const Test = (props: TestProps) => {
  const [context, dispatch] = useContext(Context);
  const { test } = context;

  const onModifyTestState = () => {
    dispatch({
      type: TestActionTypeEnum.MODIFY_TEST_STATE_CONTENT,
      payload: props.newContent || ''
    });
  };

  return (
    <div className={sc()}>
      <h1>This is Test Page</h1>
      <div className={sc('content')} data-testid="testContent">
        {test.content}
      </div>
      <div className={sc('modify')} onClick={onModifyTestState} data-testid="testModify">
        Modify Test State
      </div>
    </div>
  );
};

describe('Test React Context', () => {
  afterEach(cleanup);

  test('Consumer can get value', () => {
    customRender(
      <Context.Consumer>
        {(value) => <span>Received: {value[0].test.content}</span>}
      </Context.Consumer>
    );

    expect(screen.getByText(/^Received:/).textContent).toBe(
      `Received: ${initializeStore.test.content}`
    );
  });

  test('Component shows value from Provider', () => {
    customRender(<Test />);
    expect(screen.getByTestId('testContent').textContent).toBe(initializeStore.test.content);
  });

  test('Context dispatch can modify Context value', () => {
    const newTestContent = 'new test content';
    customRender(<Test newContent={newTestContent} />);
    fireEvent(
      screen.getByTestId('testModify'),
      new MouseEvent('click', { bubbles: true, cancelable: true })
    );
    expect(screen.getByTestId('testContent').textContent).toBe(newTestContent);
  });
});
