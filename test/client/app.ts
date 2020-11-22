import { createLogger } from '../../src';

const logger = createLogger({ category: 'testing' });

logger.verbose('Hey!', { tell: { me: { how: { deep: { we: { should: { go: 5, ohno: undefined, ta: 'hey', beep: null, isFlagged: true, date: new Date() } } } } } } });
logger.debug('debugging!');
logger.verbose('verboseness!');
logger.warning('warnings');
logger.error('erroroneous');
logger.error(new Error('This is a test!'));