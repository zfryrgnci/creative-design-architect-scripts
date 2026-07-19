from fpdf import FPDF

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 15)
        self.cell(0, 10, 'Creative Design Architect Scripts', 0, 1, 'C')
        self.set_font('Arial', 'I', 11)
        self.cell(0, 10, 'Content List and Official Guide Book', 0, 1, 'C')
        self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

def create_pdf():
    pdf = PDF()
    pdf.add_page()
    
    # Intro
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, '1. Introduction', 0, 1)
    pdf.set_font('Arial', '', 11)
    intro_text = (
        "Welcome to the Creative Design Architect Scripts suite.\n\n"
        "This package contains 1,225 procedural automation scripts spanning 5 platforms:\n"
        "- Adobe Photoshop (245 Scripts)\n"
        "- Adobe Illustrator (245 Scripts)\n"
        "- Adobe After Effects (245 Scripts)\n"
        "- Adobe Premiere Pro (245 Scripts)\n"
        "- Autodesk 3ds Max (245 Scripts)\n\n"
        "All Adobe scripts are built using the ES3 legacy standard to guarantee 100% "
        "compatibility across every version of Adobe CC. The 3ds Max scripts use stable MAXScript API calls."
    )
    pdf.multi_cell(0, 8, intro_text)
    pdf.ln(5)
    
    # How to use
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, '2. How To Use', 0, 1)
    pdf.set_font('Arial', '', 11)
    usage_text = (
        "Adobe CC (Photoshop, Illustrator, After Effects, Premiere):\n"
        "1. Open your Adobe application.\n"
        "2. Navigate to File > Scripts > Browse... \n"
        "3. Select any .jsx file from the respective folder.\n\n"
        "Autodesk 3ds Max:\n"
        "1. Open 3ds Max.\n"
        "2. Navigate to Scripting > Run Script...\n"
        "3. Select any .ms file from the 3ds_max folder."
    )
    pdf.multi_cell(0, 8, usage_text)
    pdf.ln(5)
    
    # Categories
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, '3. Content List & Categories', 0, 1)
    pdf.set_font('Arial', '', 11)
    cat_text = (
        "Each platform's 245 scripts are divided into the following master categories:\n\n"
        "Scripts 001 - 049 : Batch Processing\n"
        "Automated asset pipelines and bulk file management.\n\n"
        "Scripts 050 - 098 : Geometry & Layers\n"
        "Structural manipulation scripts for dealing with deep layer hierarchies.\n\n"
        "Scripts 099 - 147 : Color & Materials\n"
        "Procedural styling, grading, and material generation.\n\n"
        "Scripts 148 - 196 : Text & Data\n"
        "Typography management and automated data-merge integrations.\n\n"
        "Scripts 197 - 245 : System Utilities\n"
        "Deep system cleanup, environment optimization, and rigorous testing macros."
    )
    pdf.multi_cell(0, 8, cat_text)
    
    pdf.output('Content_List_and_Guide_Book.pdf', 'F')
    print("PDF Generated successfully.")

if __name__ == '__main__':
    create_pdf()
