import { CapitalizeFirstLetterPipe } from './capitalize-first-letter.pipe';

describe('CapitalizeFirstLetterPipe', () => {
  const pipe = new CapitalizeFirstLetterPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform abc efj to Abc efj', () => {
    expect(pipe.transform('abc efj')).toBe('Abc efj');
  });
});
