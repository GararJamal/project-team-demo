package ma.projectteam.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.Instant;

/**
 * A Role.
 */
@Entity
@Table(name = "role")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "role")
public class Role implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "n_ame")
    private String nAME;

    @Column(name = "c_ode")
    private String cODE;

    @Column(name = "d_escription")
    private String dESCRIPTION;

    @Column(name = "c_reatedby")
    private Integer cREATEDBY;

    @Column(name = "c_reatedat")
    private Instant cREATEDAT;

    @Column(name = "u_pdatedby")
    private Integer uPDATEDBY;

    @Column(name = "u_pdatedat")
    private Instant uPDATEDAT;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getnAME() {
        return nAME;
    }

    public Role nAME(String nAME) {
        this.nAME = nAME;
        return this;
    }

    public void setnAME(String nAME) {
        this.nAME = nAME;
    }

    public String getcODE() {
        return cODE;
    }

    public Role cODE(String cODE) {
        this.cODE = cODE;
        return this;
    }

    public void setcODE(String cODE) {
        this.cODE = cODE;
    }

    public String getdESCRIPTION() {
        return dESCRIPTION;
    }

    public Role dESCRIPTION(String dESCRIPTION) {
        this.dESCRIPTION = dESCRIPTION;
        return this;
    }

    public void setdESCRIPTION(String dESCRIPTION) {
        this.dESCRIPTION = dESCRIPTION;
    }

    public Integer getcREATEDBY() {
        return cREATEDBY;
    }

    public Role cREATEDBY(Integer cREATEDBY) {
        this.cREATEDBY = cREATEDBY;
        return this;
    }

    public void setcREATEDBY(Integer cREATEDBY) {
        this.cREATEDBY = cREATEDBY;
    }

    public Instant getcREATEDAT() {
        return cREATEDAT;
    }

    public Role cREATEDAT(Instant cREATEDAT) {
        this.cREATEDAT = cREATEDAT;
        return this;
    }

    public void setcREATEDAT(Instant cREATEDAT) {
        this.cREATEDAT = cREATEDAT;
    }

    public Integer getuPDATEDBY() {
        return uPDATEDBY;
    }

    public Role uPDATEDBY(Integer uPDATEDBY) {
        this.uPDATEDBY = uPDATEDBY;
        return this;
    }

    public void setuPDATEDBY(Integer uPDATEDBY) {
        this.uPDATEDBY = uPDATEDBY;
    }

    public Instant getuPDATEDAT() {
        return uPDATEDAT;
    }

    public Role uPDATEDAT(Instant uPDATEDAT) {
        this.uPDATEDAT = uPDATEDAT;
        return this;
    }

    public void setuPDATEDAT(Instant uPDATEDAT) {
        this.uPDATEDAT = uPDATEDAT;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Role)) {
            return false;
        }
        return id != null && id.equals(((Role) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Role{" +
            "id=" + getId() +
            ", nAME='" + getnAME() + "'" +
            ", cODE='" + getcODE() + "'" +
            ", dESCRIPTION='" + getdESCRIPTION() + "'" +
            ", cREATEDBY=" + getcREATEDBY() +
            ", cREATEDAT='" + getcREATEDAT() + "'" +
            ", uPDATEDBY=" + getuPDATEDBY() +
            ", uPDATEDAT='" + getuPDATEDAT() + "'" +
            "}";
    }
}
