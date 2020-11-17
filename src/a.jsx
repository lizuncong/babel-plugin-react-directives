function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

const f = () => {
  const a = () => console.log(history);
  const history = 1;
  return a;
}


const f1 = () => {
  const a = history;
  const history = 1;
  return a;
}


f();
f1();
