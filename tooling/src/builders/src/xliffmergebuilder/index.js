import { createBuilder } from '@angular-devkit/architect';
import XliffmergeBuilder from './xliffmerge.builder';
export default createBuilder((options, context) => {
    const xliffmergeBuilder = new XliffmergeBuilder(context);
    return xliffmergeBuilder.run(options).toPromise();
});
//# sourceMappingURL=index.js.map