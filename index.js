document.addEventListener('DOMContentLoaded', function () {
    var _a, _b, _c, _d, _e, _f;
    var form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        generateResume();
    });
    (_a = document.getElementById('add_education')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return addField('education'); });
    (_b = document.getElementById('add_experience')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return addField('experience'); });
    (_c = document.getElementById('add_skill')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return addField('skills'); });
    (_d = document.getElementById('edit_resume')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () { return editResume(); });
    (_e = document.getElementById('download_pdf')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () { return downloadPDF(); });
    (_f = document.getElementById('copy_link')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', function () { return generateUniqueURL(); });
});
function addField(sectionId) {
    var section = document.getElementById(sectionId);
    var textarea = document.createElement('textarea');
    textarea.name = sectionId;
    textarea.placeholder = "Your ".concat(sectionId.charAt(0).toUpperCase() + sectionId.slice(1));
    textarea.required = true;
    section.appendChild(textarea);
}
function generateResume() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var contactNo = document.getElementById('contact_no').value;
    var education = getValues('education');
    var experience = getValues('experience');
    var skills = getValues('skills');
    updateResume(name, email, contactNo, education, experience, skills);
    var resumeSection = document.getElementById('Resume');
    resumeSection.style.display = "block";
    alert("Scroll down to see your resume");
}
function getValues(sectionId) {
    var section = document.getElementById(sectionId);
    var textareas = section.querySelectorAll('textarea');
    return Array.from(textareas).map(function (textarea) { return textarea.value; });
}
function updateResume(name, email, contactNo, education, experience, skills) {
    var resumeSection = document.getElementById('Resume');
    resumeSection.querySelector('.Header2 h1').textContent = name;
    resumeSection.querySelector('.PersonalInfo .p1').innerHTML = "<strong>Name:</strong> ".concat(name);
    resumeSection.querySelector('.PersonalInfo p:nth-child(2)').innerHTML = "<strong>Email:</strong> ".concat(email);
    resumeSection.querySelector('.PersonalInfo p:nth-child(3)').innerHTML = "<strong>Contact:</strong> ".concat(contactNo);
    updateSection('education', education);
    updateSection('experience', experience);
    updateSection('skills', skills);
}
function updateSection(sectionId, items) {
    var section = document.querySelector(".".concat(sectionId.charAt(0).toUpperCase() + sectionId.slice(1), " ul"));
    section.innerHTML = '';
    items.forEach(function (item) {
        var li = document.createElement('li');
        li.textContent = item;
        section.appendChild(li);
    });
}
function editResume() {
    var name = document.querySelector('.Header2 h1').textContent;
    var email = document.querySelector('.PersonalInfo p:nth-child(2)').textContent.split(': ')[1];
    var contactNo = document.querySelector('.PersonalInfo p:nth-child(3)').textContent.split(': ')[1];
    document.getElementById('name').value = name || '';
    document.getElementById('email').value = email || '';
    document.getElementById('contact_no').value = contactNo || '';
    var education = getTextValues('.Education ul');
    var experience = getTextValues('.Experience ul');
    var skills = getTextValues('.Skills ul');
    repopulateSection('education', education);
    repopulateSection('experience', experience);
    repopulateSection('skills', skills);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function getTextValues(selector) {
    var items = document.querySelectorAll("".concat(selector, " li"));
    return Array.from(items).map(function (item) { return item.textContent || ''; });
}
function repopulateSection(sectionId, values) {
    var section = document.getElementById(sectionId);
    section.innerHTML = ''; 
    values.forEach(function (value) {
        var textarea = document.createElement('textarea');
        textarea.name = sectionId;
        textarea.placeholder = "Your ".concat(sectionId.charAt(0).toUpperCase() + sectionId.slice(1));
        textarea.required = true;
        textarea.value = value;
        section.appendChild(textarea);
    });
}
function generateUniqueURL() {
    var name = document.getElementById('name').value.trim().replace(/\s+/g, '').toLowerCase();
    var resumeSection = document.getElementById('Resume');
   
    var resumeContent = resumeSection.innerHTML;
  
    localStorage.setItem("resume_".concat(name), resumeContent);
   
    var uniqueUrl = "".concat(window.location.origin, "/resume.html?user=").concat(name);
   
    alert("Your unique URL: ".concat(uniqueUrl));
}
function copyResumeLink() {
    var name = document.getElementById('name').value.trim().replace(/\s+/g, '').toLowerCase();
    var uniqueUrl = "".concat(window.location.origin, "/resume.html?user=").concat(name);
   
    if (navigator.clipboard) {
        navigator.clipboard.writeText(uniqueUrl).then(function () {
            alert('Resume link copied to clipboard!');
        }).catch(function (err) {
            console.error('Error copying text: ', err);
            alert('Failed to copy the link. Please try again.');
        });
    }
    else {
        var textarea = document.createElement('textarea');
        textarea.value = uniqueUrl;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            alert('Resume link copied to clipboard!');
        }
        catch (err) {
            console.error('Error copying text: ', err);
            alert('Failed to copy the link. Please try manually.');
        }
        document.body.removeChild(textarea);
    }
}
function downloadPDF() {
    var resumeSection = document.getElementById('Resume');
   
    var buttons = document.querySelectorAll('button');
    buttons.forEach(function (button) { return button.style.display = 'none'; });
    
    html2pdf(resumeSection, {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }).then(function () {
        buttons.forEach(function (button) { return button.style.display = 'inline-block'; });
    });
}
