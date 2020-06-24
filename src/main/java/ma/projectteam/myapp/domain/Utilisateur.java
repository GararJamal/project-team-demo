package ma.projectteam.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Utilisateur.
 */
@Entity
@Table(name = "utilisateur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "utilisateur")
public class Utilisateur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "e_mail")
    private String eMAIL;

    @Column(name = "p_honenumber")
    private String pHONENUMBER;

    @Column(name = "u_sername")
    private String uSERNAME;

    @Column(name = "l_astseen")
    private Instant lASTSEEN;

    @Column(name = "d_eactivationdate")
    private Instant dEACTIVATIONDATE;

    @Column(name = "f_irstname")
    private String fIRSTNAME;

    @Column(name = "l_astname")
    private String lASTNAME;

    @Column(name = "o_ccupation")
    private String oCCUPATION;

    @Column(name = "c_ity")
    private String cITY;

    @Column(name = "k_ind")
    private String kIND;

    @Column(name = "c_reatedby")
    private Integer cREATEDBY;

    @Column(name = "c_reatedat")
    private Instant cREATEDAT;

    @Column(name = "u_pdatedby")
    private Integer uPDATEDBY;

    @Column(name = "u_pdatedat")
    private Instant uPDATEDAT;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "utilisateur_have",
               joinColumns = @JoinColumn(name = "utilisateur_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "have_id", referencedColumnName = "id"))
    private Set<Role> have = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String geteMAIL() {
        return eMAIL;
    }

    public Utilisateur eMAIL(String eMAIL) {
        this.eMAIL = eMAIL;
        return this;
    }

    public void seteMAIL(String eMAIL) {
        this.eMAIL = eMAIL;
    }

    public String getpHONENUMBER() {
        return pHONENUMBER;
    }

    public Utilisateur pHONENUMBER(String pHONENUMBER) {
        this.pHONENUMBER = pHONENUMBER;
        return this;
    }

    public void setpHONENUMBER(String pHONENUMBER) {
        this.pHONENUMBER = pHONENUMBER;
    }

    public String getuSERNAME() {
        return uSERNAME;
    }

    public Utilisateur uSERNAME(String uSERNAME) {
        this.uSERNAME = uSERNAME;
        return this;
    }

    public void setuSERNAME(String uSERNAME) {
        this.uSERNAME = uSERNAME;
    }

    public Instant getlASTSEEN() {
        return lASTSEEN;
    }

    public Utilisateur lASTSEEN(Instant lASTSEEN) {
        this.lASTSEEN = lASTSEEN;
        return this;
    }

    public void setlASTSEEN(Instant lASTSEEN) {
        this.lASTSEEN = lASTSEEN;
    }

    public Instant getdEACTIVATIONDATE() {
        return dEACTIVATIONDATE;
    }

    public Utilisateur dEACTIVATIONDATE(Instant dEACTIVATIONDATE) {
        this.dEACTIVATIONDATE = dEACTIVATIONDATE;
        return this;
    }

    public void setdEACTIVATIONDATE(Instant dEACTIVATIONDATE) {
        this.dEACTIVATIONDATE = dEACTIVATIONDATE;
    }

    public String getfIRSTNAME() {
        return fIRSTNAME;
    }

    public Utilisateur fIRSTNAME(String fIRSTNAME) {
        this.fIRSTNAME = fIRSTNAME;
        return this;
    }

    public void setfIRSTNAME(String fIRSTNAME) {
        this.fIRSTNAME = fIRSTNAME;
    }

    public String getlASTNAME() {
        return lASTNAME;
    }

    public Utilisateur lASTNAME(String lASTNAME) {
        this.lASTNAME = lASTNAME;
        return this;
    }

    public void setlASTNAME(String lASTNAME) {
        this.lASTNAME = lASTNAME;
    }

    public String getoCCUPATION() {
        return oCCUPATION;
    }

    public Utilisateur oCCUPATION(String oCCUPATION) {
        this.oCCUPATION = oCCUPATION;
        return this;
    }

    public void setoCCUPATION(String oCCUPATION) {
        this.oCCUPATION = oCCUPATION;
    }

    public String getcITY() {
        return cITY;
    }

    public Utilisateur cITY(String cITY) {
        this.cITY = cITY;
        return this;
    }

    public void setcITY(String cITY) {
        this.cITY = cITY;
    }

    public String getkIND() {
        return kIND;
    }

    public Utilisateur kIND(String kIND) {
        this.kIND = kIND;
        return this;
    }

    public void setkIND(String kIND) {
        this.kIND = kIND;
    }

    public Integer getcREATEDBY() {
        return cREATEDBY;
    }

    public Utilisateur cREATEDBY(Integer cREATEDBY) {
        this.cREATEDBY = cREATEDBY;
        return this;
    }

    public void setcREATEDBY(Integer cREATEDBY) {
        this.cREATEDBY = cREATEDBY;
    }

    public Instant getcREATEDAT() {
        return cREATEDAT;
    }

    public Utilisateur cREATEDAT(Instant cREATEDAT) {
        this.cREATEDAT = cREATEDAT;
        return this;
    }

    public void setcREATEDAT(Instant cREATEDAT) {
        this.cREATEDAT = cREATEDAT;
    }

    public Integer getuPDATEDBY() {
        return uPDATEDBY;
    }

    public Utilisateur uPDATEDBY(Integer uPDATEDBY) {
        this.uPDATEDBY = uPDATEDBY;
        return this;
    }

    public void setuPDATEDBY(Integer uPDATEDBY) {
        this.uPDATEDBY = uPDATEDBY;
    }

    public Instant getuPDATEDAT() {
        return uPDATEDAT;
    }

    public Utilisateur uPDATEDAT(Instant uPDATEDAT) {
        this.uPDATEDAT = uPDATEDAT;
        return this;
    }

    public void setuPDATEDAT(Instant uPDATEDAT) {
        this.uPDATEDAT = uPDATEDAT;
    }

    public Set<Role> getHave() {
        return have;
    }

    public Utilisateur have(Set<Role> roles) {
        this.have = roles;
        return this;
    }

    public Utilisateur addHave(Role role) {
        this.have.add(role);
        role.getAssignedTos().add(this);
        return this;
    }

    public Utilisateur removeHave(Role role) {
        this.have.remove(role);
        role.getAssignedTos().remove(this);
        return this;
    }

    public void setHave(Set<Role> roles) {
        this.have = roles;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Utilisateur)) {
            return false;
        }
        return id != null && id.equals(((Utilisateur) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Utilisateur{" +
            "id=" + getId() +
            ", eMAIL='" + geteMAIL() + "'" +
            ", pHONENUMBER='" + getpHONENUMBER() + "'" +
            ", uSERNAME='" + getuSERNAME() + "'" +
            ", lASTSEEN='" + getlASTSEEN() + "'" +
            ", dEACTIVATIONDATE='" + getdEACTIVATIONDATE() + "'" +
            ", fIRSTNAME='" + getfIRSTNAME() + "'" +
            ", lASTNAME='" + getlASTNAME() + "'" +
            ", oCCUPATION='" + getoCCUPATION() + "'" +
            ", cITY='" + getcITY() + "'" +
            ", kIND='" + getkIND() + "'" +
            ", cREATEDBY=" + getcREATEDBY() +
            ", cREATEDAT='" + getcREATEDAT() + "'" +
            ", uPDATEDBY=" + getuPDATEDBY() +
            ", uPDATEDAT='" + getuPDATEDAT() + "'" +
            "}";
    }
}
