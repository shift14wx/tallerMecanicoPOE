package com.mecanica.org.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A TipoCombustible.
 */
@Entity
@Table(name = "tipo_combustible")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TipoCombustible implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "combustible")
    private String combustible;

    @OneToMany(mappedBy = "tipoCombustible")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Automovil> automovils = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCombustible() {
        return combustible;
    }

    public TipoCombustible combustible(String combustible) {
        this.combustible = combustible;
        return this;
    }

    public void setCombustible(String combustible) {
        this.combustible = combustible;
    }

    public Set<Automovil> getAutomovils() {
        return automovils;
    }

    public TipoCombustible automovils(Set<Automovil> automovils) {
        this.automovils = automovils;
        return this;
    }

    public TipoCombustible addAutomovil(Automovil automovil) {
        this.automovils.add(automovil);
        automovil.setTipoCombustible(this);
        return this;
    }

    public TipoCombustible removeAutomovil(Automovil automovil) {
        this.automovils.remove(automovil);
        automovil.setTipoCombustible(null);
        return this;
    }

    public void setAutomovils(Set<Automovil> automovils) {
        this.automovils = automovils;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoCombustible)) {
            return false;
        }
        return id != null && id.equals(((TipoCombustible) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoCombustible{" +
            "id=" + getId() +
            ", combustible='" + getCombustible() + "'" +
            "}";
    }
}
