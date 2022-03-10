export default (...traits) => traits.reduce((acc, trait) => trait(acc), class {});
