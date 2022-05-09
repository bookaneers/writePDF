const { PDFDocument } = require('pdf-lib');
const { readFile, writeFile } = require('fs/promises');

async function createPDF(input, output) {
    try {
        const pdfDoc = await PDFDocument.load(await readFile(input));

        // read all fields of the pdf doc
        // const fieldNames = pdfDoc
        //     .getForm()
        //     .getFields()
        //     .map((f) => f.getName());
        
        // // display all fields of the pdf doc
        // console.log({ fieldNames });

        const form = pdfDoc.getForm();

        // form.getDropdown('Area Options').select(form.getDropdown('Area Options').getOptions()[3]);
        // form.getTextField('PART').setText('TEST12345678910')

        const part = form.getTextField('PART').getText()
        console.log('part : ', part);

        const qty = form.getTextField('QTY').getText()
        console.log('qty : ', qty);

        const desc = form.getTextField('DESC').getText()
        console.log('desc : ', desc);

        const notes = form.getTextField('NOTES').getText()
        console.log('notes : ', notes);

        const area = form.getDropdown('AREA').getSelected();
        console.log('area : ', area);

        const pdfBytes = await pdfDoc.save();

        await writeFile(output, pdfBytes);
        console.log('PDF created!');


    } catch (err) {
        console.log(err);
    }

}

createPDF('images/kanbaned-internal-products/internal-front-FLR-DOC0000.pdf', 'modified/output.pdf');