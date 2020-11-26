package com.mecanica.org.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A TipoAutomovil.
 */
@Entity
@Table(name = "tipo_automovil")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TipoAutomovil implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "tipo")
    private String tipo;

    @OneToMany(mappedBy = "tipoAutomovil")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Automovil> automovils = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipo() {
        return tipo;
    }

    public TipoAutomovil tipo(String tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Set<Automovil> getAutomovils() {
        return automovils;
    }

    public TipoAutomovil automovils(Set<Automovil> automovils) {
        this.automovils = automovils;
        return this;
    }

    public TipoAutomovil addAutomovil(Automovil automovil) {
        this.automovils.add(automovil);
        automovil.setTipoAutomovil(this);
        return this;
    }

    public TipoAutomovil removeAutomovil(Automovil automovil) {
        this.automovils.remove(automovil);
        automovil.setTipoAutomovil(null);
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
        if (!(o instanceof TipoAutomovil)) {
            return false;
        }
        return id != null && id.equals(((TipoAutomovil) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TipoAutomovil{" +
            "id=" + getId() +
            ", tipo='" + getTipo() + "'" +
            "}";
    }
}
