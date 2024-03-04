const getElementsByTag = require('./getelementsbytag');

describe('Get Elements By Tag', () => {
  it('should be a function', () => {
    expect(typeof getElementsByTag).toEqual('function');
  });

  it('should return paragraph tags array', () => {
    const root = document.createElement('div');

    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const span = document.createElement('span');

    root.appendChild(p1);
    span.appendChild(p2);
    root.appendChild(span);

    const res = getElementsByTag(root, 'p');

    expect(res).toEqual([p1, p2]);
  });
});
