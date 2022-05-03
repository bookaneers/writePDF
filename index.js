const { PDFDocument } = require('pdf-lib');
const { readFile, writeFile } = require('fs/promises');

async function createPDF(input, output) {
    try {
        const pdfDoc = await PDFDocument.load(await readFile(input));


        const fieldNames = pdfDoc
            .getForm()
            .getFields()
            .map((f) => f.getName());
            
        console.log({ fieldNames });

        const form = pdfDoc.getForm();

        // form.getDropdown('Area Options').select(form.getDropdown('Area Options').getOptions()[3]);
        // form.getTextField('PART').setText('TEST12345678910')

        // const notes = form.getTextField('NOTES').getText()
        // console.log('notes : ', notes);

        const pdfBytes = await pdfDoc.save();

        await writeFile(output, pdfBytes);
        console.log('PDF created!');
    } catch (err) {
        console.log(err);
    }

}

createPDF('images/kanbaned-external-products/external-front-REG-DOC0000.pdf', 'modified/output.pdf');