import scopedClasses from '../scopedClasses';

describe('Test scopedClasses function', () => {
  const sc = scopedClasses('test');

  it('scopedClassed return value is Function', () => {
    expect(sc).toBeInstanceOf(Function);
  });

  it('has prefix', () => {
    const classname = sc('content');
    expect(classname).toBe('test-content');
  });

  it('params is <key: string, value: boolean>', () => {
    const classname = sc({ content: true, active: true });
    const classnameStr = sc({ content: true, active: false });
    expect(classname).toBe('test-content test-active');
    expect(classnameStr).toBe('test-content');
  });

  it('prefix is ""', () => {
    const isolateSc = scopedClasses('');
    const classname = isolateSc('content');
    expect(classname).toBe('content');
  });

  it('params key "" is invalid', () => {
    expect(() => {
      sc({ '': true });
    }).toThrow();
  });
});
