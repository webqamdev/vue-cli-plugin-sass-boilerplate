const fs = require('fs-extra');
const path = require('path');

function moveFiles(src, dst) {
  return fs.readdir(src, { withFileTypes: true }).then(list => {
    return Promise.all(
      list.map(e => {
        let promise = fs.ensureDir(dst);

        if (e.isDirectory()) {
          promise = promise.then(() =>
            moveFiles(`${src}/${e.name}`, `${dst}/${e.name}`)
          );
        } else {
          // Escape `_` prefix if any
          const newName = e.name.charAt(0) === '_' ? `_${e.name}` : e.name;

          promise = promise.then(() =>
            fs.copyFile(`${src}/${e.name}`, `${dst}/${newName}`)
          );
        }

        return promise;
      })
    );
  });
}

const SRC = path.resolve(path.dirname(require.resolve('sass-boilerplate')), 'scss');
const DEST = path.resolve(__dirname, './generator/template/src/scss');

console.log(`Copying files from ${SRC} to ${DEST}…`);

fs.remove(DEST)
  .then(() => moveFiles(SRC, DEST))
  .then(() => {
    console.log('Done.');
  });
